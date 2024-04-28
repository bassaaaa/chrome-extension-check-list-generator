import { checkList } from "../data/checkList";

type Props = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectBox = (props: Props) => {
  const { onChange } = props;
  return (
    <div className="mx-auto my-2 w-full">
      <select className="select select-bordered w-full" defaultValue="" onChange={onChange}>
        <option disabled value="">
          選択してください
        </option>
        {checkList.categories.map((category) => {
          return (
            <option key={category.title} value={category.title}>
              {category.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};
