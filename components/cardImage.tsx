/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddToWatchlist from "@/components/add-to-watchlist"
import Link from "next/link"

type CardImageProps = {
  title: string;
  imageUrl: string;
  movieId: string;
}

export function CardImage({title, imageUrl, movieId}: CardImageProps) {
  return (
    <Card className="relative mx-auto max-w-[250] pt-0">
      <AddToWatchlist />
      <img
        src={imageUrl}
        alt={title}
        className="relative z-20 aspect-video w-full object-fill brightness-80 dark:brightness-40"
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
