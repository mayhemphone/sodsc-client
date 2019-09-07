import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FormControl, InputLabel, NativeSelect, Input, Grid, TextField, MenuItem, Paper, Button, Switch, FormGroup, FormControlLabel } from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import SERVER_URL from './constants/server';

import axios from 'axios';


//gallery
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  formControl: {
  	marginTop: theme.spacing(2),
  	minWidth: 120,
  },
  selectEmpty: {
  	marginTop: theme.spacing(2),
  },
  // gallery
  root: {
    maxWidth: '100%',
    flexGrow: 1,
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    overflow: 'hidden',
    width: '100%',

  },
}));

//gallery 

function SwipeableTextMobileStepper(props) {

	
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.values.imgs.length;

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleStepChange(step) {
    setActiveStep(step);
  }

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {props.values.imgs.map((step, index) => (
          <div key={step}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img} src={step} alt={step} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}


// add merch page

export default function AddMerch() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    item: '',
    price: '',
    category: '',
    collect: '',
    color: '',
    sex: 'u',
    description: '',
    imgs: [],
    pre_order: '',
    no_size: false,
    members_only: false,
    active: true,


  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    console.log(values)
  };
	
	const handleSwitchChange = name => event => {
    setValues({ ...values, [name]: event.target.checked });
    console.log(values.no_size)

  };


  //cloudinary

  // using urls to store all of the image resultEvents.  
  // It was not concatinating them when done directly
  let urls = []

	function checkUploadResult (resultEvent) {
		
		if (resultEvent.event === 'success') {
			urls = urls.concat(resultEvent.info.secure_url)
			setValues({ ...values, imgs: [...values.imgs.concat(urls) ] })
		}
	}
	//cloudinary
	function showWidget (widget) {
			window.cloudinary.openUploadWidget({
		  cloudName: 'mayhemphone', 
		  uploadPreset: 'sodsc-unsigned',
		  folder: 'sodsc-dev/merch'
		}, 
		  (error, result) => {checkUploadResult(result)}
		)
	}

	let gallery 
	if (values.imgs.length !== 0){
		gallery=(<SwipeableTextMobileStepper values={values} /> )
	} else {
		gallery=(<h5>No images uploaded yet.</h5>)
	}

	function submitForm (){
		console.log('Submitting:', values)
		// make axios call here

		// e.preventDefault()
    let token = localStorage.getItem('serverToken');
    // SEND DATA TO SERVER
    axios.post(`${SERVER_URL}/merch`, values, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    .then(response => {
    	console.log('merch post response', response)
    	// this.props.componentReload()

    })
    .catch(error => {
      console.log('error', error)
    })

	}

  return (
  	<Grid
		  container
		  spacing={0}
		  justify="center"
		>
			<Grid item xs={10}>
			<h1 style={{textAlign:'left'}}>New Merch Item</h1>
		    <form className={classes.container} noValidate autoComplete="off">
		      <Grid container spacing={4} >
		      	<Grid item xs={12} sm={10} > 
				       <TextField
				        id="item"
				        label="Item Name"
				        fullWidth
				        margin="normal"
				        InputLabelProps={{
				          shrink: true,
				        }}
				        value={values.item}
				        onChange={handleChange('item')}
				      />
			      </Grid>
			      <Grid item xs={12} sm={2}> 
				       <TextField
				        id="price"
				        label="Price"
				        margin="normal"
				        fullWidth
				        InputLabelProps={{
				          shrink: true,
				        }}
				        value={values.price}
				        onChange={handleChange('price')}
				      />
			      </Grid>
			      <Grid item xs={12} sm={6} > 
				      <TextField
				        id="category"
				        label="Category"
				        fullWidth
				        margin="normal"
				        InputLabelProps={{
				          shrink: true,
				        }}
				        value={values.category}
				        onChange={handleChange('category')}
				      />
				    </Grid>
			      <Grid item xs={12} sm={6} > 
				      <TextField
				        id="collect"
				        label="Collection"
				        fullWidth
				        margin="normal"
				        InputLabelProps={{
				          shrink: true,
				        }}
				        value={values.collect}
				        onChange={handleChange('collect')}
				      />
			      </Grid>
			      <Grid item xs={12} sm={6} > 
				      <TextField
				        id="color"
				        label="Color"
				        fullWidth
				        margin="normal"
				        InputLabelProps={{
				          shrink: true,
				        }}
				        value={values.color}
				        onChange={handleChange('color')}
				      />
			      </Grid>
			      <Grid item xs={12} sm={6} >
			      	<FormControl fullWidth className={classes.formControl}>
				        <InputLabel shrink htmlFor="sex-native-label-placeholder">
				          Gender
				        </InputLabel>
				        {/*seems behind a move each time*/}
				        <NativeSelect
				          value={values.sex}
				          onChange={handleChange('sex')}
				          input={<Input name="sex" id="sex-native-label-placeholder" />}
				        >
				          <option value="U">None</option>
				          <option value="M">Male</option>
				          <option value="F">Female</option>
				        </NativeSelect>
				      </FormControl>
				    </Grid>
			      <Grid item xs={12} sm={12}>
			      	<TextField
				        id="description"
				        label="Description"
				        multiline
				        rowsMax="4"
				        value={values.description}
				        onChange={handleChange('description')}
				        margin="normal"
				        fullWidth
				      />
			      </Grid>
			      <Grid item xs={12} sm={12}>
			      	<Button fullWidth variant="contained" color="primary" onClick={showWidget}>
				        Upload Merch Images &nbsp;
				        <CloudUploadIcon className={classes.rightIcon} />
				      </Button>
			      </Grid>
			      <Grid item xs={12} sm={12} padding={10}>
			      	<Paper style={{ backgroundColor:'#eee', minHeight:'300px'}} >
				      	<Grid container direction="row" justify="center" alignItems="center">
				      		<Grid item >
			      				{gallery}
		      				</Grid>
	      				</Grid>
			      	</Paper>
			      </Grid>
			      <Grid item xs={12} sm={12} container justify='flex-start' > 
					    {/*<FormControlLabel control={<Switch value="checkedC" />} label="" />*/}
				      <TextField
				        id="pre_order"
				        label="Pre-Order"
				        type="datetime-local"
				        fullWidth
				        InputLabelProps={{
				          shrink: true,
				        }}
				        value={values.pre_order}
				        onChange={handleChange('pre_order')}
				      />
				    </Grid>
				    <Grid item xs={12} sm={10}>
					    <FormGroup row>
					      <FormControlLabel control={
					       	<Switch 
					       		checked={values.no_size}
					       		value={values.no_size}
				        		onChange={handleSwitchChange('no_size')}
					       	/>
					     	} label="No Size" />
					     	<FormControlLabel control={
					       	<Switch 
					       		checked={values.members_only}
					       		value={values.members_only}
				        		onChange={handleSwitchChange('members_only')}
					       	/>
					     	} label="Members Only" />
					     	<FormControlLabel control={
					       	<Switch 
					       		checked={values.active}
					       		value={values.active}
				        		onChange={handleSwitchChange('active')}
					       	/>
					     	} label="Active" />

					    </FormGroup>
					  </Grid>
					  <Grid item xs={12} sm={2} container justify="flex-end">
					  	<Button fullWidth variant="contained" color="primary" onClick={submitForm}>
				        Create
				      </Button>
						</Grid>			    
				  </Grid>


		    </form>
	    </Grid>
    </Grid>
  );
}