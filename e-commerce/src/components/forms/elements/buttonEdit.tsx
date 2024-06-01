import { CSSProperties } from 'react';
import { CiEdit } from 'react-icons/ci';

type Props = {
  id: string;
  style?: CSSProperties;
  classNameButton?: string;
  size?: string;
  onClick: () => void;
};

function ButtonEdit({
  id,
  style = {},
  classNameButton = 'formComponents-buttonEdit-position-absolute',
  size = '24',
  onClick,
}: Props) {
  const buttonStyles = {
    width: `${size}px`,
    height: `${size}px`,
  };

  const svgStyles = {
    width: `inherit`,
    height: `inherit`,
  };

  return (
    <button
      id={id}
      type="button"
      className={classNameButton}
      style={{ ...buttonStyles, ...style }}
      onClick={() => onClick()}
    >
      <CiEdit style={svgStyles} />
    </button>
  );
}

export default ButtonEdit;
