import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

type CardImageProps = {
  title: string;
  imageUrl: string;
  movieId: string;
}

export function CardImage({title, imageUrl, movieId}: CardImageProps) {
  return (
    <Card className="relative mx-auto max-w-xs pt-0">
      <Image
        src={imageUrl}
        alt={title}
        width="247"
        height="139"
        className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
      />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full"><Link href={`/movies/${movieId}`}>More Info</Link></Button>
      </CardFooter>
    </Card>
  )
}
