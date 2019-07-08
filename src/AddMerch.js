import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, NativeSelect, Input, Grid, TextField, MenuItem, Paper, Button, Switch, FormGroup, FormControlLabel } from '@material-ui/core/';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
  }
}));

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function AddMerch() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
  	<Grid
		  container
		  spacing={0}
		  justify="center"
		>
			<Grid item xs={10}>
			<h1 style={{textAlign:'left'}}>Create Merch Item</h1>
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
				      />
				    </Grid>
			      <Grid item xs={12} sm={6} > 
				      <TextField
				        id="collection"
				        label="Collection"
				        fullWidth
				        margin="normal"
				        InputLabelProps={{
				          shrink: true,
				        }}
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
				      />
			      </Grid>
			      <Grid item xs={12} sm={6} >
			      	<FormControl fullWidth className={classes.formControl}>
				        <InputLabel shrink htmlFor="age-native-label-placeholder">
				          Gender
				        </InputLabel>
				        <NativeSelect
				          value={values.age}
				          onChange={handleChange('age')}
				          input={<Input name="age" id="age-native-label-placeholder" />}
				        >
				          <option value="U">None</option>
				          <option value="M">Male</option>
				          <option value="F">Female</option>
				          {/*<option value={30}>Thirty</option>*/}
				        </NativeSelect>
				      </FormControl>
				    </Grid>
			      <Grid item xs={12} sm={12}>
			      	<TextField
				        id="description"
				        label="Description"
				        multiline
				        rowsMax="4"
				        value={values.multiline}
				        onChange={handleChange('multiline')}
				        margin="normal"
				        fullWidth
				      />
			      </Grid>
			      <Grid item xs={12} sm={12}>
			      	<Button fullWidth variant="contained" color="primary" >
				        Upload Merch Images &nbsp;
				        <CloudUploadIcon className={classes.rightIcon} />
				      </Button>
			      </Grid>
			      <Grid item xs={12} sm={12} padding={10}>
			      	<Paper style={{ backgroundColor:'#eee', minHeight:'300px'}} >
				      	<Grid container direction="row" justify="center" alignItems="center">
				      		<Grid item >
			      				<h5>Uploaded images render here.  Flipper maybe?</h5>
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
				        defaultValue="2009-01-01T00:00"
				        fullWidth
				        InputLabelProps={{
				          shrink: true,
				        }}
				      />
				    </Grid>
				    <Grid item xs={12} sm={10}>
					    <FormGroup row>
					       <FormControlLabel control={<Switch value="checkedC" />} label="No Size" />
					       <FormControlLabel control={<Switch value="checkedC" />} label="Members Only" />
					       <FormControlLabel control={<Switch value="checkedC" />} label="Active" />
					    </FormGroup>
					  </Grid>
					  <Grid item xs={12} sm={2} container justify="flex-end">
					  	<Button fullWidth variant="contained" color="primary" >
				        Create
				      </Button>
						</Grid>			    
				  </Grid>


		    </form>
	    </Grid>
    </Grid>
  );
}