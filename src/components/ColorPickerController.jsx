import { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";

const ColorPickerController = ({ hideController = false, selectedColor }) => {
  const [color, setColor] = useState("rgba(255,255,255,1)");

  return (
    <div>
      <ColorPicker
        value={color}
        onChange={(event) => {
          setColor(event);
          selectedColor(event);
        }}
        hideControls={hideController}
        hideEyeDrop
        hideAdvancedSliders
        hideColorGuide
        hideInputType
      />
    </div>
  );
};

export default ColorPickerController;
