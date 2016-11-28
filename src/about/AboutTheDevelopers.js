import React from 'react';
import MyModal from '../widgets/MyModal';

class AboutTheDevelopers extends React.Component {

    render() {
        let body = (
            <div>
            <p>Joe Hall has been a professional software developer for more than 25 years.</p>
            <p>He worked as a programmer for Microsoft and IBM and he was the software architect for a Fortune 500 bank. He was the CTO of a ticket sales and servicing company and he started his own consulting company in 2006.</p>
            <p>Joe makes his living writing desktop, web, and mobile device applications for businesses and governmental agencies, but game programming is his passion, and it was gaming that got him into programming in the first place.</p>
            <p>He was a member of the original Xbox team and he joined the Visual Studio .NET team just after the Xbox was released in 2001. Joe is the author of <a href="http://www.amazon.com/XNA-Game-Studio-Express-Developing/dp/1598633686/ref=as_sl_pc_tf_mfw?&linkCode=wey&tag=coll06-20" target="_blank"><em>XNA Game Studio Express: Developing Games for Windows and the Xbox 360</em></a>, which was published in 2007.</p>
            <p>Joe also <a href="http://groundh0g.deviantart.com/" target="_blank">dabbles</a> in sketching, cartooning, and creating 3D models. When you see his artistic creations, you'll understand why he makes his living as a programmer.</p>
            </div>
        );

        return (
            <div>
                <MyModal id={this.constructor.name} title="About the Developer" body={body} />
            </div>
        );
    }

    static Show() { MyModal.Show("AboutTheDevelopers"); }
    static Close() { MyModal.Close("AboutTheDevelopers"); }
}

export default AboutTheDevelopers;