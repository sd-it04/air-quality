import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { getCondition } from '../util/condition';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      margin: '10px 100px 10px 10px',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    expandedContent: {
      maxHeight: '100px',
    },
  }),
);

const CityCard = ({
  city,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { precaution, healthImplication, color, level } = getCondition(city.aqi);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader style={{ background: color }}
        avatar={
          <Avatar style={{ background: color }}>
            {level ==='Good' ? <MoodIcon /> : <MoodBadIcon />}
          </Avatar>
        }
        title={city.city}
        subheader={level.toUpperCase()}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component={'span'}>
          {healthImplication}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.expandedContent}>
          <Typography component={'span'}>Precaution:</Typography>
          <Typography component={'span'}>
           {precaution}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CityCard;