import { Injectable, Logger } from '@nestjs/common';
import { execFile } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

@Injectable()
export class VideoRenderService {
  private readonly logger = new Logger(VideoRenderService.name);

  async renderPlaceholderVideo(jobId: string, title: string): Promise<string> {
    const outDir = process.env.VIDEO_OUTPUT_DIR || './storage/videos';
    await mkdir(outDir, { recursive: true });

    const outPath = join(outDir, `${jobId}.mp4`);
    const text = title.replace(/[:'"\\]/g, '');

    await new Promise<void>((resolve, reject) => {
      execFile(
        'ffmpeg',
        [
          '-y',
          '-f',
          'lavfi',
          '-i',
          'color=c=0x111827:s=1280x720:d=6',
          '-vf',
          `drawtext=text='${text}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2`,
          outPath
        ],
        (error) => {
          if (error) {
            this.logger.error(`FFmpeg 渲染失败: ${error.message}`);
            return reject(error);
          }
          resolve();
        }
      );
    });

    return outPath;
  }
}
