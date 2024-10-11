type TProps = {
  currentPage: number;
  title: string;
  totalPages: number;
  pageHasChords: boolean;
};


const PageTitle:React.FC<TProps> = ({currentPage, pageHasChords, title, totalPages}) => {
  return (
    <div className={`flex ${pageHasChords ? "flex-col flex-start" : "flex-row justify-between w-1/2"} text-bj-green-light  font-semibold text-left`}>
      <p className="text-5xl">{title}</p>

      <p className="text-4xl">
        {currentPage}/{totalPages}
      </p>
    </div>
  );
}

export default PageTitle
