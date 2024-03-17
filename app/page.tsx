import Image from "next/image";
import ImageClassifier from "./imageClassifier";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <ImageClassifier />
    </main>
  );
}
