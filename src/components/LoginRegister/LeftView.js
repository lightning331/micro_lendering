import React from 'react';
import image_background from '../../asserts/image/app_background.png'
import image_logo from '../../asserts/image/img_logo.png'

const LeftView = () => {
    return (
        <div className="col-md-6" style={styles.left_page}>
        <div style={styles.img_logo} >
            <img src={image_logo} width='141px' alt="background" />
        </div>
        <div>
            <div style={styles.welcome}>
                <p>Welcome</p>
            </div>
            <div style={styles.description}>
                <p>Dana Darurat is the most advance lending &amp; borrowing platform in Indonesia</p>
            </div>
        </div>
    </div>
    );
};

const styles = {
    /*******    left page   ******/
    left_page: {
        backgroundImage: `url(${image_background})`,
        backgroundRepeat: 'noRepeat',
        backgroundSize: 'cover',
        height: '-webkit-fill-available',
        display: 'flex',
        // flexFlow: 'row',
        alignItems: 'center',
        paddingLeft: '135px',
    },
    img_logo: {
        position: 'absolute',
        top:'120px'
    },
    welcome: {
        fontWeight:'bold',
        fontSize: '38px',
        color: 'white',
        // lineHeight: '50px',
    },
    description: {
        fontSize: '18px',
        color: 'white',
        lineHeight: '24px',
        paddingRight: '100px',
        paddingTop: '15px'
    },
}

export default LeftView;