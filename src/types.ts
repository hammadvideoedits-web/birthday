export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  tag: string;
  rotation?: number;
}

export interface LoveCoupon {
  id: string;
  title: string;
  urduTitle: string;
  desc: string;
  icon: string;
  redeemed: boolean;
  category: 'romantic' | 'treat' | 'cute' | 'adventure';
}

export interface LoveConfig {
  herName: string;
  wifeNickname: string;
  hisName: string;
  meetingDate: string; // e.g. "2022-04-14"
  birthdayDate: string; // e.g. "Today"
  customLetter: string;
  poetryLines: string[];
  vows: Array<{ title: string; urdu: string; promise: string }>;
  reasons: string[];
  memories: MemoryItem[];
  coupons: LoveCoupon[];
}

export interface SurpriseProgress {
  openedEnvelope: boolean;
  candlesBlown: boolean;
  cakeCut: boolean;
  openedGifts: number[]; // e.g. [1, 2, 3]
  redeemedCoupons: string[];
  openedReasons: number[];
}
