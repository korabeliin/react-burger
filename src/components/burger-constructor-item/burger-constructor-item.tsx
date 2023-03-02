import {FC, useRef} from 'react';
import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";

import { SORT_STUFFING, DELETE_STUFF_FROM_CONSTRUCTOR } from '../../redux/slices/constructorIngredientsSlice';


type TBurgerConstructorItem = {
  text: string;
  thumbnail: string;
  price: number;
  id: string;
  index: number;
}

type THoverItem = {
  id: string;
  index: number;
}

const BurgerConstructorItem: FC<TBurgerConstructorItem> = ({text, thumbnail, price, id, index}) => {

  const stuffing = useSelector((store:any) => store.constructorIngredients.constructorIngredients.stuffing);

  const dispatch = useDispatch();

  const handleStuffDelete = (key:string) => {
    if(stuffing[index].key === key) {
      dispatch(DELETE_STUFF_FROM_CONSTRUCTOR(key))
    }
  }

  // SORT PART
    const stuffSortRef = useRef<HTMLLIElement>(null)

    const [{ handlerId }, drop] = useDrop({
      accept: 'stuffingSort',
      collect(monitor: DropTargetMonitor<THoverItem>) {
        return {
          handlerId: monitor.getHandlerId()
        }
      },
      hover(item, monitor) {
        if (!stuffSortRef.current) return

        const dragIndex = item.index
        const hoverIndex = index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) return

        // Determine rectangle on screen
        const hoverBoundingRect = stuffSortRef.current?.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

        // Time to actually perform the action
        dispatch(SORT_STUFFING({dragIndex, hoverIndex}))

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
      },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'stuffingSort',
        item: () => {
          return { id, index }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(stuffSortRef))

  return (
    <li 
      className={`${styles.burgerConstructorItem} mr-3`} 
      style={{opacity}} ref={stuffSortRef} 
      data-handler-id={handlerId}>
      <div className={styles.bullets}>
          <DragIcon type="primary" />
      </div>
      <div className='mr-8'>
          <ConstructorElement
            text={text}
            price={price}
            thumbnail={thumbnail}
            handleClose={() => handleStuffDelete(id)}
          />
      </div>
  </li>
  );
};

export default BurgerConstructorItem;