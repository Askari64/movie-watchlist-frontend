import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

type CardImageProps = {
  title: string;
  imageUrl: string;
}

export function CardImage({title, imageUrl}: CardImageProps) {
  return (
    <Card className="relative mx-auto max-w-xs pt-0">
      <Image
        src={imageUrl}
        alt={title}
        width="384"
        height="216"
        className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">More Info</Button>
      </CardFooter>
    </Card>
  )
}
