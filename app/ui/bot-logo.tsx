import { SwatchIcon } from '@heroicons/react/24/outline';
import { inter } from '@/app/ui/fonts';

export default function BotLogo() {
  return (
    <div
      className={`${inter.className} flex flex-row items-center leading-none text-white`}
    >
      <SwatchIcon className="h-12 w-12 rotate-[0deg]" />
      <p className="text-[18px]">ServisBOT</p>
    </div>
  );
}
