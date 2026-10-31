import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/images/oagitech-logo.png';

export default function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Oagitech home">
      <Image src={logo} alt="OAGITECH — Oil & Gas Inspection Technology" priority style={{ height: 66, width: 'auto' }} />
    </Link>
  );
}
