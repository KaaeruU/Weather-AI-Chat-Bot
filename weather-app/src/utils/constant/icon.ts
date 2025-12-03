const iconSize = ["67", "51", "32", "24", "21", "16", "14"] as const;

const iconName = [
  "CloudIcon",
  "LockIcon",
] as const;

const iconsWeights = ["regular", "bold"] as const;

const iconSetting = { iconSize, iconName, iconsWeights };

export default iconSetting;
