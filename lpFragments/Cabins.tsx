import Image from "next/image";

const Cabins = () => {
  return <section style={{position: 'relative'}}>
    We're cabins
    <Image src="/rooms/bedroom.webp" alt="bedroom" layout="fill"/>
  </section>;
}

export default Cabins;
