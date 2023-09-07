const Quiz = () => {
  return (
    <div className="py-20 flex flex-col items-center">
      <h1>Test Quiz</h1>
      <p className="w-2/3 text-center">
        Jawablah tes ini sesuai dengan apa yang kamu rasakan sekarang. Tidak ada
        jawaban yang benar ataupun salah yang ada di tes ini. Selamat menjawab!
      </p>
      <form className="flex">
        <div className="flex flex-col mx-5">
          <input id="tidaksuka" name="tidaksuka" type="radio" value={1} />
          <label htmlFor="tidaksuka">Tidak suka</label>
        </div>
        <div className="flex flex-col mx-5">
          <input
            id="tidakterlalusuka"
            name="tidakterlalusuka"
            type="radio"
            value={2}
          />
          <label htmlFor="tidakterlalusuka">Tidak terlalu suka</label>
        </div>
        <div className="flex flex-col mx-5">
          <input id="netral" name="netral" type="radio" value={0} />
          <label htmlFor="netral">Netral</label>
        </div>
        <div className="flex flex-col mx-5">
          <input id="suka" name="suka" type="radio" value={3} />
          <label htmlFor="suka">Suka</label>
        </div>
        <div className="flex flex-col mx-5">
          <input id="sangatsuka" name="sangatsuka" type="radio" value={4} />
          <label htmlFor="sangatsuka">Sangat suka</label>
        </div>
      </form>
    </div>
  );
};

export default Quiz;
