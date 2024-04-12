import { ReactNative as RN, stylesheet, toasts, React } from "@metro/common";
import { findByName, findByNameAll } from "./metro/filters";

const { View, Image, TouchableOpacity } = RN;

interface Badge {
    name: string;
    id: string;
    url: {
      dark: string;
      light: string;
    };
  }
  
  
  const cache = {
    user: {},
    badges: {}
  };

export function initBadges()
{
    const OldBadges = findByNameAll('ProfileBadges', false);
    const NewBadges = findByName("ProfileBadges", false );
}