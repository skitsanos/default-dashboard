import React from 'react';
import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';
import './style.less';

interface GradientButtonProps extends ButtonProps {
    gradientType?: 'primary' | 'secondary' | 'danger';
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
    className, 
    gradientType = 'primary',
    type,
    ...props 
}) => {
    const variantClass = gradientType !== 'primary' ? `gradient-button-${gradientType}` : '';
    const buttonType = type || (gradientType === 'primary' ? 'primary' : 'default');
    
    return (
        <Button
            className={classNames('gradient-button', variantClass, className)}
            type={buttonType}
            {...props}
        />
    );
};

export default GradientButton;