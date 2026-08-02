import {
  HiOutlineCodeBracketSquare,
  HiOutlineServerStack,
  HiOutlineSquares2X2,
  HiOutlineCubeTransparent,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCommandLine,
  HiOutlineCodeBracket,
  HiOutlineChartBar,
  HiOutlineFire,
  HiOutlineSparkles,
  HiOutlineMoon,
  HiOutlineBolt,
  HiOutlineTrophy,
  HiOutlineStar,
} from 'react-icons/hi2';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaFire,
  FaBolt,
  FaTrophy,
  FaMedal,
  FaCode,
  FaShoePrints,
} from 'react-icons/fa6';
import { SiOpenjdk, SiCplusplus } from 'react-icons/si';

const map = {
  HiOutlineCodeBracketSquare,
  HiOutlineServerStack,
  HiOutlineSquares2X2,
  HiOutlineCubeTransparent,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCommandLine,
  HiOutlineCodeBracket,
  HiOutlineChartBar,
  HiOutlineFire,
  HiOutlineSparkles,
  HiOutlineMoon,
  HiOutlineBolt,
  HiOutlineTrophy,
  HiOutlineStar,
  FaReact,
  FaNodeJs,
  FaPython,
  SiOpenjdk,
  SiCplusplus,
  FaFire,
  FaBolt,
  FaTrophy,
  FaMedal,
  FaCode,
  FaShoePrints,
};

export default function DynamicIcon({ name, className }) {
  const Icon = map[name] || HiOutlineCodeBracketSquare;
  return <Icon className={className} />;
}
