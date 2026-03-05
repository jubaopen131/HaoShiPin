import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateVideoJobDto } from './dto';
import { LlmService } from '../llm/llm.service';
import { VideoRenderService } from './video-render.service';

export type VideoJob = {
  id: string;
  status: 'queued' | 'processing' | 'done' | 'failed';
  input: CreateVideoJobDto;
  videoUrl?: string;
  error?: string;
  outputPath?: string;
};

@Injectable()
export class VideoJobsService {
  private readonly jobs = new Map<string, VideoJob>();

  constructor(
    private readonly llmService: LlmService,
    private readonly videoRenderService: VideoRenderService
  ) {}

  async create(input: CreateVideoJobDto): Promise<VideoJob> {
    const id = uuid();
    const job: VideoJob = { id, status: 'queued', input };
    this.jobs.set(id, job);

    void this.process(id);
    return job;
  }

  findOne(id: string): VideoJob {
    const job = this.jobs.get(id);
    if (!job) throw new NotFoundException('任务不存在');
    return job;
  }

  private async process(id: string) {
    const job = this.jobs.get(id);
    if (!job) return;

    job.status = 'processing';

    try {
      const storyboard = await this.llmService.generateStoryboard({
        productCopy: job.input.productCopy,
        productUrl: job.input.productUrl
      });

      const filePath = await this.videoRenderService.renderPlaceholderVideo(id, storyboard.title);
      job.status = 'done';
      job.videoUrl = `/static/videos/${id}.mp4`;
      job.outputPath = filePath;
    } catch (error) {
      job.status = 'failed';
      job.error = error instanceof Error ? error.message : '未知错误';
    }
  }
}
