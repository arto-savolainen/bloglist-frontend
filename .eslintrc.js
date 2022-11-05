module.exports = {
    'env': {
        'node': true,
        'commonjs': true,
        'es6': true,
        'browser': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'overrides': [
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
            'modules': true
        },
        "sourceType": "module",
        'ecmaVersion': 'latest'
    },
    'rules': {
        // suppress errors for missing 'import React' in files
        'react/react-in-jsx-scope': 'off',
        'indent': [
            'error',
            2,
            { 'SwitchCase': 1 }
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0
    }
}
