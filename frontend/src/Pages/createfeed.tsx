import { FormEvent, useRef } from "react";
import Redirectuser from "../utils/redirecthome";

const CreateFeed = () => {
  Redirectuser();
  const post = useRef<HTMLTextAreaElement>(null);
  const isPrivate = useRef<HTMLInputElement>(null);
  const isAnonym = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentPost = post.current;
    const currentPrivate = isPrivate.current;
    const currentAnonym = isAnonym.current;

    if (!currentPost || !currentPrivate || !currentAnonym) return;

    const data = {
      postVal: currentPost.value,
      privateVal: currentPrivate.checked,
      anonymVal: currentAnonym.checked,
    };

    console.log(data);
  };

  return (
    <div className="py-20">
      <form
        onSubmit={handleSubmit}
        className="my-10 flex flex-col items-center"
      >
        <h2>Create Feed</h2>
        <textarea
          rows={5}
          cols={50}
          name="post"
          id="post"
          className="my-5 border outline-none p-1"
          ref={post}
        />

        <div className="flex mb-2">
          <input type="checkbox" name="private" id="private" ref={isPrivate} />
          <label htmlFor="private" className="ml-5">
            Jadikan sebagai pribadi / private
          </label>
        </div>
        <div className="flex mb-5">
          <input type="checkbox" name="anonym" id="anonym" ref={isAnonym} />
          <label htmlFor="anonym" className="ml-5">
            Jadikan sebagai anonim (tidak diketahui)
          </label>
        </div>

        <button type="submit" className="normalbutton">
          Buat Postingan
        </button>
      </form>
    </div>
  );
};

export default CreateFeed;
