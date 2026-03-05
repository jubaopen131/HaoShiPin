import { Injectable } from '@nestjs/common';

export type StoryboardResult = {
  title: string;
  hook: string;
  scenes: string[];
  voiceover: string;
};

@Injectable()
export class LlmService {
  async generateStoryboard(input: { productCopy?: string; productUrl?: string }): Promise<StoryboardResult> {
    const seedText = input.productCopy || input.productUrl || '新品推荐';

    return {
      title: '30秒爆款带货视频',
      hook: `3秒抓住用户：${seedText.slice(0, 20)}`,
      scenes: [
        '镜头1：产品特写，突出核心卖点',
        '镜头2：痛点对比，展示使用前后差异',
        '镜头3：限时优惠 + 强行动召唤'
      ],
      voiceover: `这款产品的核心优势是：${seedText}。现在下单立享优惠，点击链接马上入手！`
    };
  }
}
