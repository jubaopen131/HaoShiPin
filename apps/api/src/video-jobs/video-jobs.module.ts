import { Module } from '@nestjs/common';
import { VideoJobsController } from './video-jobs.controller';
import { VideoJobsService } from './video-jobs.service';
import { LlmService } from '../llm/llm.service';
import { VideoRenderService } from './video-render.service';

@Module({
  controllers: [VideoJobsController],
  providers: [VideoJobsService, LlmService, VideoRenderService]
})
export class VideoJobsModule {}
