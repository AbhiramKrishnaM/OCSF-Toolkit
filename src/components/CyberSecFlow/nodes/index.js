import AlertTriggerNode from './AlertTriggerNode';
import ScheduleTriggerNode from './ScheduleTriggerNode';
import WebhookNode from './WebhookNode';
import FileWatchNode from './FileWatchNode';
import VulnerabilityScanNode from './VulnerabilityScanNode';
import ThreatFeedNode from './ThreatFeedNode';
import LogParserNode from './LogParserNode';
import ReputationCheckNode from './ReputationCheckNode';
import EventCorrelationNode from './EventCorrelationNode';
import AnomalyDetectionNode from './AnomalyDetectionNode';
import DataFilterNode from './DataFilterNode';
import DataTransformNode from './DataTransformNode';
import IoCLookupNode from './IoCLookupNode';
import DataEnrichmentNode from './DataEnrichmentNode';
import RagQueryNode from './RagQueryNode';
import ThreatScoringNode from './ThreatScoringNode';
import DecisionNode from './DecisionNode';
import BlockIpNode from './BlockIpNode';
import CreateTicketNode from './CreateTicketNode';
import SendNotificationNode from './SendNotificationNode';

export const nodeTypes = {
  'alert-trigger': AlertTriggerNode,
  'schedule-trigger': ScheduleTriggerNode,
  'webhook': WebhookNode,
  'file-watch': FileWatchNode,
  'vulnerability-scan': VulnerabilityScanNode,
  'threat-feed': ThreatFeedNode,
  'log-parser': LogParserNode,
  'reputation-check': ReputationCheckNode,
  'event-correlation': EventCorrelationNode,
  'anomaly-detection': AnomalyDetectionNode,
  'data-filter': DataFilterNode,
  'data-transform': DataTransformNode,
  'ioc-lookup': IoCLookupNode,
  'data-enrichment': DataEnrichmentNode,
  'rag-query': RagQueryNode,
  'threat-scoring': ThreatScoringNode,
  'decision': DecisionNode,
  'block-ip': BlockIpNode,
  'create-ticket': CreateTicketNode,
  'send-notification': SendNotificationNode
};
