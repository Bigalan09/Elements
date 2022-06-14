export default {
    title: 'Elements/Components/Toast',
    component: 'el-toast',
    args: {
    },
    argTypes: {
        slot: {
            control: 'text',
            defaultValue: 'This is a card!',
        },
    },
};

const Template = ({slot}) => `<el-toast>${slot}</el-toast>`;

// 👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = { slot: 'This is a primary toast!' };
