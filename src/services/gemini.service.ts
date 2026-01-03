import { Injectable } from '@angular/core';
import { GoogleGenAI } from "@google/genai";

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.API_KEY) {
        console.error("API_KEY environment variable not set.");
        throw new Error("API_KEY environment variable not set.");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private async generateContent(prompt: string): Promise<string> {
    try {
        const response = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error('Error generating content with Gemini:', error);
        return 'দুঃখিত, এআই কন্টেন্ট তৈরি করার সময় একটি সমস্যা হয়েছে।';
    }
  }

  async generateJobDescription(jobTitle: string): Promise<string> {
    const prompt = `
      তুমি একজন অভিজ্ঞ এইচআর ম্যানেজার। তোমার কাজ হলো একটি চাকরির জন্য একটি আকর্ষণীয় এবং বিস্তারিত বিবরণ (Job Description) তৈরি করা। বিবরণটি প্রাঞ্জল বাংলা ভাষায় হতে হবে।

      পদের নাম: ${jobTitle}

      এই পদের জন্য প্রধান দায়িত্ব, কর্তব্য এবং কাজের পরিধি উল্লেখ করে একটি সম্পূর্ণ বিবরণ তৈরি কর। শুধুমাত্র মূল টেক্সট প্রদান করবে, কোনো অতিরিক্ত শিরোনাম বা ভূমিকা যোগ করবে না।
    `;
    return this.generateContent(prompt);
  }

  async generateJobRequirement(jobTitle: string): Promise<string> {
    const prompt = `
      তুমি একজন অভিজ্ঞ এইচআর ম্যানেজার। ${jobTitle} পদের জন্য প্রয়োজনীয় যোগ্যতা এবং দক্ষতার (Job Requirement) একটি তালিকা তৈরি কর।

      তালিকাটিতে শিক্ষাগত যোগ্যতা, অভিজ্ঞতা, প্রযুক্তিগত দক্ষতা এবং অন্যান্য প্রয়োজনীয় দক্ষতার বিষয়গুলো অন্তর্ভুক্ত কর। তালিকাটি বুলেট পয়েন্ট আকারে হলে ভালো হয়। শুধুমাত্র মূল টেক্সট প্রদান করবে।
    `;
    return this.generateContent(prompt);
  }

  async generateInvoiceSummary(client: string, items: { description: string; total: number }[], totalAmount: string): Promise<string> {
    const itemsDescription = items.map(item => `- ${item.description} (৳${item.total})`).join('\n');

    const prompt = `
      তুমি একজন পেশাদার ব্যবসায়িক যোগাযোগ বিশেষজ্ঞ। তোমার কাজ হলো একটি চালানের (invoice) জন্য একটি সংক্ষিপ্ত এবং পেশাদার সারসংক্ষেপ তৈরি করা।
      সারসংক্ষেপটি প্রাঞ্জল বাংলা ভাষায় হতে হবে।

      এখানে চালানের বিস্তারিত তথ্য দেওয়া হলো:
      ক্লায়েন্টের নাম: ${client}
      আইটেমসমূহ:
      ${itemsDescription}
      মোট পরিমাণ: ${totalAmount} টাকা

      এই তথ্যের উপর ভিত্তি করে চালানের জন্য একটি বন্ধুত্বপূর্ণ কিন্তু পেশাদার সারসংক্ষেপ বা নোট তৈরি কর। 
      শুধুমাত্র সারসংক্ষেপটি প্রদান করবে, কোনো অতিরিক্ত ভূমিকা বা মন্তব্য যোগ করবে না।
      উদাহরণ: 'প্রিয় ${client}, আপনার সুবিধার জন্য নিম্নলিখিত পরিষেবাগুলির চালান প্রদান করা হলো। আপনার সহযোগিতার জন্য ধন্যবাদ।'
    `;
    return this.generateContent(prompt);
  }
}
