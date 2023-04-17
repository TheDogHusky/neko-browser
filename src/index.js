const electron = require('electron');
const settings = require('./settings.json');
const path = require('path');

const { app, BrowserWindow } = electron;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function createLoadingWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'pages', 'assets','loadingPreload.js'),
            contextIsolation: true
        },
        icon: path.join(__dirname, 'pages', 'assets/icon.png'),
        frame: false,
        transparent: false,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        title: 'Neko Browser is loading..',
        movable: false,
        show: false,
        autoHideMenuBar: true
    });

    electron.ipcMain.handle('getVersion', async (event, data) => {
        return require('../package.json').version;
    });

    win.loadFile('pages/loading.html');
    const handleRedirect = (e, url) => {
        if(url !== win.webContents.getURL()) {
            e.preventDefault();
            electron.shell.openExternal(url);
        }
    };
    const handleRedirectOpen = ({ url }) => {
        electron.shell.openExternal(url);
        return { action: 'deny' };
    };

    win.once('ready-to-show', () => {
        win.show();
        win.webContents.on('will-navigate', handleRedirect);
        win.webContents.setWindowOpenHandler(handleRedirectOpen);
        wait(30000).then(() => {
            createWindow().then((nw) => {
                win.close();
                nw.show();
            });
        });
    });
}

async function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'pages', 'assets','preload.js'),
            contextIsolation: true
        },
        icon: path.join(__dirname, 'pages', 'assets/icon.png'),
        frame: true,
        transparent: false,
        resizable: true,
        maximizable: true,
        fullscreenable: true,
        title: 'Neko Browser',
        movable: true,
        show: false,
        autoHideMenuBar: true
    });

    await win.loadFile('pages/index.html');

    return win;
}

app.whenReady().then(() => {
    createLoadingWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createLoadingWindow();
        }
    });

    electron.ipcMain.handle('getSettings', (event, data) => {
        return settings;
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
