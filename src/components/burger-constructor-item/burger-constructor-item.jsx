import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor-item.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";

import { SORT_STUFFING, DELETE_STUFF_FROM_CONSTRUCTOR } from '../../redux/slices/constructorIngredientsSlice';

const BurgerConstructorItem = ({text, thumbnail, price, id, index}) => {

  const stuffing = useSelector(store => store.constructorIngredients.constructorIngredients.stuffing);

  const dispatch = useDispatch();

  const handleStuffDelete = (key) => {
    if(stuffing[index].key === key) {
      dispatch(DELETE_STUFF_FROM_CONSTRUCTOR(key))
    }
  }

  // SORT PART
    const stuffSortRef = useRef(null)

    const [{ handlerId }, drop] = useDrop({
      accept: 'stuffingSort',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId()
        }
      },
      hover(item, monitor) {
        if (!stuffSortRef.current) return
        // console.log('isOver', isOver)
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
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
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
      className={`${styles.burgerConstructorItem} mb-4`} 
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

BurgerConstructorItem.propTypes = {
    text: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
}

export default BurgerConstructorItem;