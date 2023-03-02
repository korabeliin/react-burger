import styles from './entrance.module.css';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from 'react';

type TEntrance = {
  title: string;
  buttonText: string;
  children: React.ReactNode;
}

const Entrance: FC<TEntrance> = ({children, title, buttonText}) => {
  return (
    <section className={`${styles.entrance} mt-15`}>
      <h3 className='text text_type_main-medium mb-6'>{title}</h3>
      {children}
      <Button htmlType="submit" type="primary" size="medium" extraClass='mb-20'>
        {buttonText}
      </Button>
    </section>
  );
};

export default Entrance;