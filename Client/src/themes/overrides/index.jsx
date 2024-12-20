// third-party
import { merge } from 'lodash'

// project-imports
import Body from './Body'
import Button from './Button.jsx'
import ButtonBase from './ButtonBase'
import ButtonGroup from './ButtonGroup'
import CardContent from './CardContent'
import Checkbox from './Checkbox'
import Chip from './Chip'
import Drawer from './Drawer'
import DatePicker from './DatePicker'
import FormHelperText from './FormHelperText'
import IconButton from './IconButton'
// import InputBase from './InputBase';
import InputLabel from './InputLabel'
import LinearProgress from './LinearProgress'
import Link from './Link'
import ListItemButton from './ListItemButton'
import ListItemIcon from './ListItemIcon'
import LoadingButton from './LoadingButton'
import OutlinedInput from './OutlinedInput'
import Tab from './Tab'
import Tabs from './Tabs'
import ToggleButton from './ToggleButton'
import Tooltip from './Tooltip'
import Typography from './Typography'
import Table from './Table'
import Slider from './Slider.jsx'
import Radio from './RadioButton.jsx'
import Dialog from './Dialog'
import Switch from './Switch'
import Accordion from './Accordion'
import Popover from './Popover.jsx'
import Paper from './Paper.jsx'
import Autocomplete from './Autocomplete'
import { cssBaseline } from '~/themes/overrides/cssBaseline'

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme) {
  return merge(
    Accordion(theme),
    Autocomplete(theme),
    Body(),
    Button(theme),
    ButtonBase(),
    ButtonGroup(),
    cssBaseline(),
    CardContent(),
    Checkbox(theme),
    Chip(theme),
    Drawer(),
    DatePicker(theme),
    Dialog(theme),
    FormHelperText(),
    IconButton(theme),
    // InputBase(),
    InputLabel(theme),
    LinearProgress(),
    Link(),
    ListItemButton(theme),
    ListItemIcon(theme),
    LoadingButton(),
    OutlinedInput(theme),
    Paper(),
    Popover(theme),
    Tab(theme),
    Tabs(),
    ToggleButton(theme),
    Tooltip(theme),
    Typography(),
    Table(theme),
    Slider(theme),
    Switch(theme),
    Radio(theme)
  )
}
