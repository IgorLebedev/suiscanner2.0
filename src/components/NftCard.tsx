const Card = ({ link }: { link: string }) => {
  return (
    <div className="p-3 col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 rounded-lg bg-slate-300 transition-all hover:-translate-x-2 hover:-translate-y-2">
      <div className="m-auto">
        <img src={link} alt='...' className="rounded-md" />
      </div>
    </div>
  );
}
    

export default Card;