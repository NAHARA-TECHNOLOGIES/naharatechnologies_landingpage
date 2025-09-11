declare interface RegularListProps<T> {
  data: T[];
  renderItem: React.FC<T>;
  keyExtractor?: (number | string)[];
  [key: string]: any;
}

declare interface HowWeWorkCardProps {
  imageSetupType: string;
  title: string;
  text: string;
  values?: { id: number; title: string; text: string }[];
  imageWrapAnimProps?: any;
  containerAnimProps?: any;
  titleAnimProps?: any;
  descAnimProps?: any;
}

declare interface TicketProps {
  id: number;
  issue: string;
  priority: "High" | "Medium" | "Low";
  status: string;
  resolutionTime: string;
}
