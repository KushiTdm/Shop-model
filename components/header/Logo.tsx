import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" aria-label="ModShop" className="flex items-center gap-1 select-none">
      <span className="text-2xl font-bold tracking-tight text-black">modshop</span>
      <span
        className="inline-block w-0 h-0 border-y-[7px] border-y-transparent border-l-[10px]"
        style={{ borderLeftColor: "#FF6900" }}
        aria-hidden
      />
    </Link>
  );
}
