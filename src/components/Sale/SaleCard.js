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
import SaleCardItem from './SaleCardItem';

export default function SaleCard(props) {
  const { sale,labelKeyObjectArray, headerObject } = props;

  return (
    <Card
      onClick={() => {
        alert(`Orden de venta ${sale[headerObject.key]}`);
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {headerObject.label} {sale[headerObject.key]}
          </Typography>
          <Divider />
          <Typography variant="body2" color="textSecondary" component="div">
            {
            labelKeyObjectArray.map((element,i) => {
              return <SaleCardItem
                key={i}
                className={styles.CardItems}
                label={element.label}
                text={sale[element.key]}
                />
            })}
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
