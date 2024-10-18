export interface CustomBadges {
    badge: string;
    name: string;
      opti: {
        developer: boolean;
        contributor: boolean;
        supporter: boolean;
      };
    }
    
    export interface BadgeProps {
      name: string;
      image: string;
      custom?: any;
    }
    
    export interface BadgeComponents {
      name: string;
      image: string;
      size: number;
      margin: number;
      custom?: object;
    }
    
    export type BadgeCache = {
      badges: CustomBadges;
      lastFetch: number;
    };