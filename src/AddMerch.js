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

export default function AddMerch() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    item: '',
    price: '',
    category: '',
    collection: '',
    color: '',
    sex: '',
    description: '',
    imgs: '',
    'pre_order': '',
    'no_size': false,
    'members_only': false,
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
				        id="collection"
				        label="Collection"
				        fullWidth
				        margin="normal"
				        InputLabelProps={{
				          shrink: true,
				        }}
				        value={values.collection}
				        onChange={handleChange('collection')}
				      />
			      </Grid>
			      <Grid item xs={12} sm={6} > 
				      <TextField
				        id="standard-color"
				        label="color"
				        className={classes.textField}
				        value={values.color}
				        onChange={handleChange('color')}
				        margin="normal"
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