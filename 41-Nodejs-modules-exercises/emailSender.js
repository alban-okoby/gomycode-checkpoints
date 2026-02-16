// Import the nodemailer module
const nodemailer = require('nodemailer');

// Configuration object for email settings
const emailConfig = {
    // Using Gmail - you'll need to use an App Password
    // For testing, you can use Ethereal (fake SMTP service)
    useEthereal: true, // Set to false to use Gmail
    
    // Gmail configuration (if useEthereal is false)
    gmail: {
        service: 'gmail',
        auth: {
            user: 'digitalsouag@gmail.com', // email
            pass: 'tbfpsmuhdsehcdri'      // app password
        }
    }
};

/**
 * Create a test email account on Ethereal
 * @returns {Promise<Object>} - Transporter and test account info
 */
const createEtherealTransporter = async () => {
    try {
        // Generate test SMTP service account from ethereal.email
        const testAccount = await nodemailer.createTestAccount();
        
        console.log('✅ Ethereal test account created:');
        console.log(`   Email: ${testAccount.user}`);
        console.log(`   Password: ${testAccount.pass}`);
        console.log(`   Preview URL: https://ethereal.email\n`);
        
        // Create reusable transporter object using the test SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
        
        return { transporter, testAccount };
    } catch (error) {
        console.error('Error creating Ethereal account:', error);
        throw error;
    }
};

/**
 * Create Gmail transporter
 * @returns {Object} - Gmail transporter
 */
const createGmailTransporter = () => {
    return nodemailer.createTransport({
        service: emailConfig.gmail.service,
        auth: {
            user: emailConfig.gmail.auth.user,
            pass: emailConfig.gmail.auth.pass
        }
    });
};

/**
 * Send an email
 * @param {Object} transporter - Nodemailer transporter
 * @param {Object} mailOptions - Email options
 * @returns {Promise} - Send result
 */
const sendEmail = async (transporter, mailOptions) => {
    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully!');
        console.log(`   Message ID: ${info.messageId}`);
        
        // Preview URL only works with Ethereal
        if (emailConfig.useEthereal) {
            console.log(`   Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        }
        
        return info;
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
};

/**
 * Main function to demonstrate email sending
 */
const main = async () => {
    console.log('📧 NODEMAILER EMAIL SENDING DEMO\n');
    
    try {
        // Create transporter based on configuration
        let transporter;
        
        if (emailConfig.useEthereal) {
            // Use Ethereal for testing
            const { transporter: etherealTransporter } = await createEtherealTransporter();
            transporter = etherealTransporter;
        } else {
            // Use Gmail (requires app password)
            transporter = createGmailTransporter();
        }
        
        // Define email options
        const mailOptions = {
            from: emailConfig.useEthereal 
                ? '"Student Report System" <reports@studentsystem.com>' 
                : '"Student Report System" <your.email@gmail.com>',
            to: emailConfig.useEthereal 
                ? 'recipient@example.com' 
                : 'recipient@gmail.com', // Replace with actual recipient
            subject: 'Student Report Notification',
            text: 'Please find attached the student report.',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                        .content { background: #f5f5f5; padding: 20px; border-radius: 0 0 10px 10px; }
                        .report { background: white; padding: 15px; border-radius: 5px; margin: 20px 0; }
                        .pass { color: green; font-weight: bold; }
                        .fail { color: red; font-weight: bold; }
                        .footer { text-align: center; margin-top: 20px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>📊 Student Report System</h1>
                        </div>
                        <div class="content">
                            <h2>Hello Administrator,</h2>
                            <p>A new student report has been generated:</p>
                            
                            <div class="report">
                                <h3>Student: John Doe</h3>
                                <p><strong>Scores:</strong> [15, 8, 12, 10, 14]</p>
                                <p><strong>Average:</strong> 11.80</p>
                                <p><strong>Status:</strong> <span class="pass">PASS</span></p>
                                <p><strong>Highest Score:</strong> 15</p>
                                <p><strong>Lowest Score:</strong> 8</p>
                            </div>
                            
                            <div class="report">
                                <h3>Student: Jane Smith</h3>
                                <p><strong>Scores:</strong> [7, 9, 6, 8, 5]</p>
                                <p><strong>Average:</strong> 7.00</p>
                                <p><strong>Status:</strong> <span class="fail">FAIL</span></p>
                                <p><strong>Highest Score:</strong> 9</p>
                                <p><strong>Lowest Score:</strong> 5</p>
                            </div>
                            
                            <p><strong>Total Students:</strong> 2</p>
                            <p><strong>Generated at:</strong> ${new Date().toLocaleString()}</p>
                        </div>
                        <div class="footer">
                            <p>This is an automated message from the Student Report System.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };
        
        // Also try to send a plain text version
        const textMailOptions = {
            ...mailOptions,
            subject: 'Student Report (Plain Text)',
            html: undefined,
            text: `
STUDENT REPORT SYSTEM
=====================

Hello Administrator,

A new student report has been generated:

Student: John Doe
Scores: [15, 8, 12, 10, 14]
Average: 11.80
Status: PASS
Highest Score: 15
Lowest Score: 8

Student: Jane Smith
Scores: [7, 9, 6, 8, 5]
Average: 7.00
Status: FAIL
Highest Score: 9
Lowest Score: 5

Total Students: 2
Generated at: ${new Date().toLocaleString()}

---
This is an automated message from the Student Report System.
            `
        };
        
        // Send HTML email
        console.log('📤 Sending HTML email...');
        await sendEmail(transporter, mailOptions);
        
        // Send plain text email
        console.log('\n📤 Sending plain text email...');
        await sendEmail(transporter, textMailOptions);
        
        console.log('\n✅ All emails sent successfully!');
        
    } catch (error) {
        console.error('❌ Failed to send emails:', error);
    }
};

// Run the main function
if (require.main === module) {
    main().catch(console.error);
}

// Export for use in other modules
module.exports = { sendEmail, createEtherealTransporter, createGmailTransporter };