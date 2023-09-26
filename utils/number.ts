import { Color } from '@/interfaces/general';

interface NumberType {
  type: 'image' | 'mask';
  color: Color;
  val: Number | String | '';
  background: any;
  typography: string;
  fontSize: string;
}
const printNumber = ({ type, color, val, background, typography, fontSize }: NumberType) => {
  let canvas: any = document.getElementById('numberCanvas');
  canvas.style.backgroundColor = 'black';
  let ctx = canvas.getContext('2d');
  ctx.font = `${fontSize} ${typography}`;
  ctx.textAlign = 'center';

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (type == 'mask') {
    ctx.font = `${fontSize} ${typography}`;
    ctx.fillStyle = `rgb(${background.r},${background.g},${background.b})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillText(val, canvas.width / 2, 270);
  return canvas.toDataURL();
};

export default printNumber;
