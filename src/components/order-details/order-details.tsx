import styles from './order-details.module.css';
import doneImg from '../../images/done.svg';
import {useSelector} from 'react-redux';

const OrderDetails = () => {

    const orderIndex = useSelector((store:any) => store.order.order.id)

    return (
        <div className={`${styles.orderDetails} pb-10 pl-20 pr-20`}>
            <h1 className="text text_type_digits-large mb-8">{orderIndex}</h1>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <img src={doneImg} alt="Done" className='mb-15' />
            <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;