import Dropdown from 'react-bootstrap/Dropdown';

const Header = ({ ontoggleAllSentences, onHideEnglish }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                <i className="bi bi-gear"></i> Settings
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={ontoggleAllSentences}>Display All Sentences</Dropdown.Item>
                <Dropdown.Item onClick={onHideEnglish}>Display English</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Header