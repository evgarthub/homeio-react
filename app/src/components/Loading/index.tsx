import { Spin } from "antd";
import { Loader } from "react-feather";
import "./styles.scss";

interface LoadingProps {
  title?: string;
}

export const Loading = (props: LoadingProps) => {
  const antIcon = <Loader />;

  return (
    <div className="loading">
      <div className="loading__container">
        <div className="loading__indicator">
          <Spin indicator={antIcon} />
        </div>
        {props.title && <div className="loading__title">{props.title}</div>}
      </div>
    </div>
  );
};
