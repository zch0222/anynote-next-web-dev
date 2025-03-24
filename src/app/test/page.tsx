"use client"

import React, { useState, useRef } from 'react';
import { Tree, Button, Space, Input, Divider, message, Dropdown, Modal, Form } from 'antd';
import type { MenuProps } from 'antd';
import { MoreOutlined, PlusOutlined, UndoOutlined, RedoOutlined, SaveOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import '@wangeditor/editor/dist/css/style.css';
import { Editor as WangEditor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';

interface TreeNode {
    title: string;
    key: string;
    children?: TreeNode[];
}

// 动态导入富文本编辑器，避免SSR问题
const Editor = dynamic(() => import('@wangeditor/editor-for-react').then(mod => mod.Editor), { ssr: false });

const CourseDirectory = () => {
    const [form] = Form.useForm();
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    const [editingKey, setEditingKey] = useState<string>('');
    const [editingValue, setEditingValue] = useState<string>('');

    // 编辑器状态
    const [editor, setEditor] = useState<IDomEditor | null>(null);
    const [html, setHtml] = useState('<p>请输入内容...</p>');
    const [title, setTitle] = useState('无标题');
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'same' | 'sub'>('same');

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
    };

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {};

    // 组件销毁时销毁编辑器
    React.useEffect(() => {
        return () => {
            if (editor == null) return;
            editor.destroy();
            setEditor(null);
        };
    }, [editor]);

    // 添加同级目录
    const handleAddSameLevel = () => {
        setModalType('same');
        setIsModalVisible(true);
    };

    // 添加子目录
    const handleAddSubLevel = () => {
        setModalType('sub');
        setIsModalVisible(true);
    };

    // 确认添加目录
    const handleModalOk = () => {
        form.validateFields().then(values => {
            const newNode = {
                title: values.title,
                key: Date.now().toString(),
                children: []
            };

            if (modalType === 'same') {
                setTreeData([...treeData, newNode]);
            } else {
                // 添加子目录
                const newTreeData = [...treeData];
                const addChildToNode = (nodes: any[]) => {
                    nodes.forEach(node => {
                        if (node.key === selectedKeys[0]) {
                            node.children = node.children || [];
                            node.children.push(newNode);
                        } else if (node.children) {
                            addChildToNode(node.children);
                        }
                    });
                };
                addChildToNode(newTreeData);
                setTreeData(newTreeData);
            }

            form.resetFields();
            setIsModalVisible(false);
            message.success('添加成功');
        });
    };

    // 保存处理
    const handleSave = () => {
        message.success('保存成功');
    };

    // 预览处理
    const handlePreview = () => {
        message.info('预览功能开发中');
    };

    // 完成处理
    const handleComplete = () => {
        message.success('文档已完成');
    };

    // 树节点操作
    const onSelect = (keys: any) => {
        setSelectedKeys(keys);
        console.log('选中节点', keys);
    };

    // 更多菜单选项
    const moreMenuItems: MenuProps['items'] = [
        {
            key: 'rename',
            label: '重命名'
        },
        {
            key: 'delete',
            label: '删除',
            danger: true
        }
    ];

    // 处理更多菜单点击
    const handleMoreMenuClick = ({ key }: { key: string }, node: TreeNode) => {
        switch (key) {
            case 'rename':
                setEditingKey(node.key);
                setEditingValue(node.title);
                break;
            case 'delete':
                // 删除节点
                const deleteNode = (nodes: TreeNode[]): TreeNode[] => {
                    return nodes.filter(item => {
                        if (item.key === node.key) {
                            return false;
                        }
                        if (item.children) {
                            item.children = deleteNode(item.children);
                        }
                        return true;
                    });
                };
                setTreeData(deleteNode([...treeData]));
                message.success('删除成功');
                break;
        }
    };

    // 处理重命名确认
    const handleRename = (node: TreeNode) => {
        if (!editingValue.trim()) {
            message.error('名称不能为空');
            return;
        }

        const updateNodeTitle = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map(item => {
                if (item.key === node.key) {
                    return { ...item, title: editingValue };
                }
                if (item.children) {
                    return { ...item, children: updateNodeTitle(item.children) };
                }
                return item;
            });
        };

        setTreeData(updateNodeTitle([...treeData]));
        setEditingKey('');
        message.success('重命名成功');
    };

    // 自定义节点渲染
    const titleRender = (node: TreeNode) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {editingKey === node.key ? (
                <Input
                    size="small"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onPressEnter={() => handleRename(node)}
                    onBlur={() => handleRename(node)}
                    autoFocus
                    style={{ width: 'calc(100% - 32px)' }}
                />
            ) : (
                <span>{node.title}</span>
            )}
            <Dropdown
                menu={{
                    items: moreMenuItems,
                    onClick: (info) => handleMoreMenuClick(info, node)
                }}
                trigger={['click']}
            >
                <Button type="text" size="small" icon={<MoreOutlined />} />
            </Dropdown>
        </div>
    );

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* 左侧目录树 */}
            <div style={{ width: 240, borderRight: '1px solid #e8e8e8', padding: 8 }}>
                <Tree
                    showLine
                    onSelect={onSelect}
                    defaultExpandedKeys={['01']}
                    treeData={treeData}
                    titleRender={titleRender}
                />
            </div>

            {/* 右侧编辑区域 */}
            <div style={{ flex: 1, padding: 8 }}>
                {/* 顶部工具栏 */}
                <Space style={{ marginBottom: 8, width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                        <Button icon={<PlusOutlined />} onClick={handleAddSameLevel}>同级目录</Button>
                        <Button icon={<PlusOutlined />} onClick={handleAddSubLevel}>子目录</Button>
                    </Space>
                    <Space>
                        <Button icon={<UndoOutlined />}>撤销</Button>
                        <Button icon={<RedoOutlined />}>恢复</Button>
                        <Button icon={<SaveOutlined />} onClick={handleSave}>保存</Button>
                        <Button icon={<EyeOutlined />} onClick={handlePreview}>预览</Button>
                        <Button type={"primary"} icon={<CheckOutlined />} onClick={handleComplete}>完成</Button>
                    </Space>
                </Space>

                {/* 编辑内容区域 */}
                <div style={{ border: '1px solid #e8e8e8', padding: 8, height: 'calc(100% - 60px)' }}>
                    <Input
                        placeholder="输入标题"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ marginBottom: 8, fontSize: 18 }}
                    />
                    <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                        <Toolbar
                            editor={editor}
                            defaultConfig={toolbarConfig}
                            mode="default"
                            style={{ borderBottom: '1px solid #ccc' }}
                        />
                        <WangEditor
                            defaultConfig={editorConfig}
                            value={html}
                            onCreated={setEditor}
                            onChange={editor => setHtml(editor.getHtml())}
                            mode="default"
                            style={{ height: '500px', overflowY: 'hidden' }}
                        />
                    </div>
                </div>
            </div>

            {/* 添加目录弹窗 */}
            <Modal
                title={modalType === 'same' ? '添加同级目录' : '添加子目录'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form}>
                    <Form.Item
                        name="title"
                        label="目录名称"
                        rules={[{ required: true, message: '请输入目录名称' }]}
                    >
                        <Input placeholder="请输入目录名称" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CourseDirectory;
