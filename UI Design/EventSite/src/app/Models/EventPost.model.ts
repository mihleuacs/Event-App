

export interface EventPost {
  id: number;
  eventName: string;
  eventDescription: string;
  location: string;
  createdDate: Date;
  endDate: Date;
  imageFile: string;
  categoryId: number;
  category: any;
}