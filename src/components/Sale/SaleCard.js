import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import styles from './SaleCard.module.scss';

export default function SaleCard(props) {
  const { sale } = props;

  return (
    <Card
      onClick={() => {
        alert(`Client ${sale.customer.firstName} ${sale.customer.lastName}`);
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            N° {sale.orderNumber}
          </Typography>
          <Divider />
          <Typography variant="body2" color="textSecondary" component="div">
            <div className={styles.CardItems}>
              <label>Cliente</label>
              <p>
                {sale.customer.firstName} {sale.customer.lastName}
              </p>
            </div>
            <div className={styles.CardItems}>
              <label>CUIT/CUIL</label>
              <p>{sale.customer.cuitCuil}</p>
            </div>
            <div className={styles.CardItems}>
              <label>Localidad</label>
              <p>{sale.customer.region}</p>
            </div>
            <div className={styles.CardItems}>
              <label>Fecha de Entrega</label>
              <p>{sale.deliveryDate ?? 'Sin Acordar'}</p>
            </div>
            <div className={styles.CardItems}>
              <label>Estado</label>
              <p>{sale.status}</p>
            </div>
            <div className={styles.CardItems}>
              <label>Monto</label>
              <p>${sale.amount}</p>
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          PDF
        </Button>
        <Button size="small" color="primary">
          Editar
        </Button>
        <Button size="small" color="primary">
          Cancelar
        </Button>
      </CardActions>
    </Card>
  );
}
