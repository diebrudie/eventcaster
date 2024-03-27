import { Dialog } from "./ui/dialog";
import { DynamicImage } from "./dynamic-image";

export default function FeedCard({ item, image, author, text }: {item: any, image: string; author: string; text: string}) {
  return (
    <Dialog>
      <DynamicImage item={item} image={image} author={author} text={text} />
    </Dialog>
  );
}
