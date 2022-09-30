import { BsCheckCircleFill } from 'react-icons/bs';
import { BsFillCircleFill } from 'react-icons/bs';
import { BiDumbbell } from 'react-icons/bi';


const Edata = [
    {
        label: 'All exercises',
        icons: <BiDumbbell />
    },
    {
        label: 'Completed',
        icons: <BsCheckCircleFill />
    },
    {
        label: 'Available',
        icons: <BsFillCircleFill />
    },
    {
        label: 'Locked',
        icons: <BsFillCircleFill />
    },
]
export default Edata;