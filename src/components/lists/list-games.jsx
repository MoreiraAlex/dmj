import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import Image from "next/image";
import Link from "next/link";

export function ListItem({ image, nome, date, user, game, id }) {
  return (
    <Link href={`/select/${game}/${id}`}>
      <Item className="flex items-center justify-between gap-4 p4 border border-accent m-2">
        <ItemMedia>
          <Image
            src={image}
            width={100}
            height={100}
            alt={nome}
            className="w-12 h-12 rounded-md object-cover"
          />
        </ItemMedia>

        <ItemContent className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <ItemTitle className="font-semibold">{nome}</ItemTitle>
          </div>

          <div className="flex flex-col text-xs text-muted-foreground gap-2">
            <span className="bg-primary rounded-2xl p-2 text-center text-primary-foreground font-bold">
              {new Date(date).toLocaleDateString("pt-BR")}
            </span>
            {user && <span>De: {user}</span>}
          </div>
        </ItemContent>
      </Item>
    </Link>
  );
}
