import { Tv } from "react-feather";
import "./styles.scss";

interface TitleWithIconProps {
  className?: string;
}

export const TitleWithIcon = (props: TitleWithIconProps) => {
  return (
    <section className={`title-with-icon ${props.className}`}>
      <div className="title-with-icon__container">
        <div className="title-with-icon__icon">
          <Tv />
        </div>
        <span className="title-with-icon__text">Home I/O</span>
      </div>
    </section>
  );
};
