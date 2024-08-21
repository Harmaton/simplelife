import { createAvatar } from '@dicebear/core';
import { pixelArt } from '@dicebear/collection';
import Image from 'next/image';

function Avatar({seed, className}: {seed: string, className?: string}){
    const avatar = createAvatar(pixelArt, {
        seed
        // ... options
      });

      const svg = avatar.toString()
      const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`

      return <Image src={dataUrl} alt={'svg'}  width={50} height={50} className={className} />
}

export default Avatar